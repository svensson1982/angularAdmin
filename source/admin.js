$(function () {
    /*edit item*/
    /*$('select[name="language-choose"]').change(function () {
     $("select[name='language-choose'] option:selected").each(function () {
     if ($(this).val() != 0) {
     var str = $(this).val();
     $.ajax({
     type: 'post',
     url: 'selectlang',
     data: {lang: str},
     dataType: 'json'
     }).done(function (data) {
     if (data.hasOwnProperty('item')) {
     $('select[name="content-choose"]').empty();
     $('select[name="content-choose"]').append('<option value="0">Choose an option</option>');
     for (var i = 0; i < data.item.length; i++) {
     var str = data.item[i].token;
     $('select[name="content-choose"]').append('<option value="' + data.item[i].id + '">' + data.item[i].description + " / " + str.substr(0, 80) + "..." + '</option>');
     }
     
     $('.second-step').fadeIn(500);
     }
     }).fail(function (err) {
     console.log(err);
     });
     }
     else {
     $('.second-step').fadeOut(500);
     }
     });
     }).change();*/

    /*second step*/
    $('select[name="content-choose"]').change(function () {
        $('select[name="content-choose"] option:selected').each(function () {
            if ($(this).val() != 0) {
                var str = $(this).val();
                $.ajax({
                    type: 'post',
                    url: 'selectcontent',
                    data: {content_id: str},
                    dataType: 'json'
                }).done(function (data) {
                    if (data.hasOwnProperty('item')) {
                        $('textarea.editor').val('<p>' + data.item[0].token + '</p>');
                        $('input[name="text_id"]').val(data.item[0].id);
                        $('.third-step').fadeIn(500);
                    }
                }).fail(function (err) {
                    console.log(err);
                });
            }
            else {
                $('.third-step').fadeOut(500);
            }
        });
    }).change();

    /*create ckeditor*/
    $('textarea.editor').ckeditor();
    CKEDITOR.on('instanceReady', function (ev) {
        ev.editor.on('paste', function (evt) {
            evt.data.dataValue = evt.data.dataValue.replace(/<p>&nbsp;<\/p>/g, '');
            console.log(evt.data.dataValue);
        }, null, null, 9);
    });

    /*submit ckeditor value to database*/
    $('#form-text').submit(function () {
        var formData = $(this).serialize(),
                lang = $('select[name="language-choose"]').val();
        $.ajax({
            type: 'post',
            url: 'updatetext',
            data: formData,
            dataType: 'json'
        }).done(function (data) {
            $.ajax({
                type: 'post',
                url: '../lang/updatelangfile',
                data: {lang: lang}
            }).done(function (data) {
                console.log(data);
            });
            if (data.hasOwnProperty('item')) {
                $('.modal-body').html('<p>' + data.item + '</p>');
                $('#contentModal').modal('show');
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            }

        }).fail(function () {

        });

        return false;
    });

    /*answer comment*/
    $('select[name="comment-choose"]').change(function () {
        $("select[name='comment-choose'] option:selected").each(function () {
            if ($(this).val() > 0) {
                var str = $(this).val();
                $.ajax({
                    type: 'post',
                    url: window.location.origin+"/admin/selectcomment",
                    data: {c_id: str},
                    dataType: 'json'
                }).done(function (data) {
                    if (data.hasOwnProperty('item')) {
                        $('input[name="comment_id"]').val(data.item[0].id);
                        $('input[name="username"]').val(data.item[0].username);
                        $('input[name="email"]').val(data.item[0].email);
                        $('textarea[name="description"]').val(data.item[0].comment);
                        $('input[name="answered"]').val(data.item[0].aid);
                        $('.load-comment-area').fadeIn(500);
                        console.log(data.item[0].usename);
                    }
                }).fail(function (err) {
                    console.log(err);
                });
            }
            else {
                $('.load-comment-area').fadeOut(500);
            }
        });
    }).change();
    /*
     $('select').on('focus', function(){
     if ($('input[name="answered"]').val() === "") {
     $('.answered').fadeOut(100);
     } else {
     $('.answered').fadeIn(100);
     }  
     console.log($('input[name="answered"]').val()); 
     });*/

    /*answer*/
    $('#form-answer').submit(function () {
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: window.location.origin+"/admin/insertanswer",
            data: formData,
            dataType: 'json'
        }).done(function (data) {
            if (data.hasOwnProperty('item')) {
                $('.modal-body').html('<p>' + data.item + '</p>');
                $('#answerModal').modal('show');
            }

        }).fail(function () {

        });

        return false;
    });
    /*gallery choose*/
    $('select[name="dir-choose"]').change(function () {
        $("select[name='dir-choose'] option:selected").each(function () {
            if ($(this).val() == 'freefly_gallery') {
                $('.handy, .own').fadeOut(200);
                $('.freefly').fadeIn(500);
                console.log($(this).val());
            }
            if ($(this).val() == 'handy_gallery') {
                $('.freefly, .own').fadeOut(200);
                $('.handy').fadeIn(500);
            }            
            if ($(this).val() == 'own_gallery') {
                $('.freefly,.handy').fadeOut(200);
                $('.own').fadeIn(500);
            }
            else if ($(this).val() == 0) {
                $('.freefly, .handy, .own').fadeOut(500);
            }
        });
    }).change();

    /*gallery delete-btn*/
    $('.gallery-img, .delete-btn')
            .mouseenter(function (e) {
                e.stopPropagation();
                $(this).children(':first').stop(true).fadeIn(400);

            })
            .mouseleave(function (e) {
                e.stopPropagation();
                $(this).children(':first').stop(true).fadeOut(400);
            });

    /*gallery delete item*/
    $('.delete-btn').on('click', function () {
        if (confirm("Delete this item?")) {
            var path = $(this).next().attr('src');
            path = path.substr(3);
            $(this).fadeOut(400);
            $(this).next().fadeOut(400);
            $(this).parent().fadeOut(400);
            $.ajax({
                type: 'post',
                url: window.location.origin+"/admin/deleteimg",
                data: {image_path: path}
            }).done(function (data) {
                console.log(data);
            }).fail(function (err) {
                console.log(err);
            });
        }
    });


    $(document).on('change', '.upload-img-freefly', function () {
        var form = new FormData(document.getElementById('form-img-freefly'));
        //append files
        var file = document.getElementById('userfile').files[0];

        if (file) {
            form.append('userfile', file);
        }
        //call ajax 
        $.ajax({
            url: window.location.origin+"/admin/uploadimgfreefly",
            type: 'POST',
            data: form,
            cache: false,
            contentType: false, //must, tell jQuery not to process the data
            processData: false, //must, tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
            },
            complete: function (XMLHttpRequest) {
                var data = XMLHttpRequest.responseText;
                console.log(data);
            },
            error: function () {
                alert("ERROR");
            }
        }).done(function () {
            console.log('Done');
            setTimeout(function () {
                window.location.reload()
            }, 500);
        }).fail(function () {
            alert("fail!");
        });

    });

    $(document).on('change', '.upload-img-handy', function () {
        var form = new FormData(document.getElementById('form-img-handy'));
        //append files
        var file = document.getElementById('userfile').files[0];

        if (file) {
            form.append('userfile', file);
        }
        //call ajax 
        $.ajax({
            url: window.location.origin+"/admin/uploadimghandyfly",
            type: 'POST',
            data: form,
            cache: false,
            contentType: false, //must, tell jQuery not to process the data
            processData: false, //must, tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
            },
            complete: function (XMLHttpRequest) {
                var data = XMLHttpRequest.responseText;
                console.log(data);
            },
            error: function () {
                alert("ERROR");
            }
        }).done(function () {
            console.log('Done');
            setTimeout(function () {
                window.location.reload()
            }, 500);
        }).fail(function () {
            alert("fail!");
        });

    });
    
    $(document).on('change', '.upload-img-own', function () {
        var form = new FormData(document.getElementById('form-img-own'));
        //append files
        var file = document.getElementById('userfile').files[0];

        if (file) {
            form.append('userfile', file);
        }
        //call ajax 
        $.ajax({
            url: window.location.origin+"/admin/uploadimgown",
            type: 'POST',
            data: form,
            cache: false,
            contentType: false, //must, tell jQuery not to process the data
            processData: false, //must, tell jQuery not to set contentType
            success: function (data) {
                console.log(data);
            },
            complete: function (XMLHttpRequest) {
                var data = XMLHttpRequest.responseText;
                console.log(data);
            },
            error: function () {
                alert("ERROR");
            }
        }).done(function () {
            console.log('Done');
            setTimeout(function () {
                window.location.reload()
            }, 500);
        }).fail(function () {
            alert("fail!");
        });

    });

    /*  $(document).on('change','.upload-img', function () {
     var path = $(this).children().children().attr('data-path');
     $.ajax({
     url: "uploadimg",
     type: 'POST',
     data: {path:path}
     }).done(function(data){
     console.log(data);
     }).fail(function(err){
     console.log('error: '+err);
     });
     });*/
});