import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { v4 as uuid_v4 } from "uuid";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  /*  const contacts = [
    { id: "1", name: "Saranya", email: "saranya.vinjarapu@gmail.com" },
    { id: "2", name: "Katya", email: "katya.ganti@gmail.com" },
  ];*/
  const addContactHandler = (contact) => {
    /* ... in "...contacts" seen below represents previous state which means we need all the previous contacts along 
    with the currently added contact which is why we are fetching ...contacts, 
    as the whole thing is an array, we added [] */

    // setContacts([...contacts, contact]);

    /* we changed the above setContacts() on line 21 to below as react was compaining about the
    "Each child in a list should have a unique "key" prop"..hence we installed uuid using 
    "npm i uuidv4" and imported it (line 6) and using it as below so that we get rid of the error */

    setContacts([...contacts, { id: uuid_v4(), ...contact }]);
  };

  //function to delete the contact

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  //useEffect helps to re render whenever a change is made

  /* we are retrieving the contacts from the local storage(check second useffect below to see how we are using localstorage to save data) 
  and passing the contact to the state so that they can be displayed as the list*/
  useEffect(() => {
    /*we are using local storage to save contacts to so that we dont loose them 
    as we refresh the page */
    const retrieveContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  /* we are using local storage to store the contacts we are adding, we are taking the input as contacts 
  and hence the "}, [contacts]" on line 40 */

  useEffect(() => {
    /*we are using local storage to save contacts to so that we dont loose them 
    as we refresh the page */
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />

      {/* we want to pass the above declared contacts array as PROPS to the below contactlist component and hence
      the "contacts={Contacts}"" and also we want to pass delete/remove contact function handler and 
      hence we declared the function above on line 32 and passing it below as "getContactId={removeContactHandler}"" */}
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
