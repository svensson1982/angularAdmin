angular.module('app')
        .service('ContactService', function () {
            
            var uid = 1;

            var contacts = [{
                    id: 0,
                    'name': 'Viral',
                    'email': 'hello@gmail.com',
                    'phone': '123-2343-44'
                }];

            this.save = function (contact) {
                if (contact.id == null) {
                    //if this is new contact, add it in contacts array
                    contact.id = uid++;
                    contacts.push(contact);
                } else {
                    //for existing contact, find this contact using id
                    //and update it.
                    for (i in contacts) {
                        if (contacts[i].id == contact.id) {
                            contacts[i] = contact;
                        }
                    }
                }
            }

            this.get = function (id) {
                for (i in contacts) {
                    if (contacts[i].id == id) {
                        return contacts[i];
                    }
                }
            }

            this.delete = function (id) {
                for (i in contacts) {
                    if (contacts[i].id == id) {
                        contacts.splice(i, 1);
                    }
                }
            }

            //simply returns the contacts list
            this.list = function () {
                return contacts;
            }
        });