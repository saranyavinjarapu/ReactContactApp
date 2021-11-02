import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  /*  const contacts = [
    { id: "1", name: "Saranya", email: "saranya.vinjarapu@gmail.com" },
    { id: "2", name: "Katya", email: "katya.ganti@gmail.com" },
  ];*/
  const addContactHandler = (contact) => {
    console.log(contact);
    /* ... in "...contacts" seen below represents previous state which means we need all the previous contacts along 
    with the currently added contact which is why we are fetching ...contacts, 
    as the whole thing is an array, we added [] */
    setContacts([...contacts, contact]);
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

      {/* we want to pass the above declared contacts array as PROPS to the below contactlist component */}
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
