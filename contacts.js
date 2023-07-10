import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const contactsPath = join("db", "contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  return searchedContact || null;
}

export async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return "Sorry, there is no contact with such ID";
  }
  const [removedContact] = contactsList.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify([...contactsList], null, 2));
  return removedContact;
}

export async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const contact = { id: nanoid(), name, email, phone };
  contactsList.push(contact);
  await writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contact;
}
