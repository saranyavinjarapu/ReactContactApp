import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  console.log(props);

  /*we received the removeContactHandler from app.js to here but in order to write the logic
  we need the id of the contact to be deleted which is availabe in ContactCard.js hence you pass the below deleteContactHandler
  function to <ContactCard> as "clickHandler={deleteContactHandler}"(see line 17) and ContactCard.js will make use of it
  as props.clickHandler through an onClick event on trash icon (see line 17 on ContactCrad.js : "onClick= {() => props.clickHandler(id)}"
  so basically the id will be passed on from ContactCard to its parent ContactList and it in turn will be passed from 
  ContactList to its parent App.js...there will be a better way to do it but for now this is it...*/

  const deleteContactHandler = (id) => {
    /*once we receive the id from ContactCard as a prop, we will use it to pass back to
    getContactId handler we received from app.js to here*/
    props.getContactId(id);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      ></ContactCard>
    );
  });
  return (
    <div className="main">
      <h2>Contact List</h2>
      {/* now that we added routes to app.js and / page denotes contact list
      lets add a button that will takes us from contactList page to AddContact page 
      instead of having to type in the url bar as "/Add"
      but when we click on it, it should take us to addContact and for that we need link
      thats why we import {link} see on line 2 and use it see below*/}
      <Link to="/add">
        <button className="ui button blue right">Add Contact</button>
      </Link>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
