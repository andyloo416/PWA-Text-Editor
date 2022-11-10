import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("put to the database");

  // connect to the database and determine the version
  const contactDb = await openDB("jate", 1);

  // create a new transaction and specify the database and privileges (can write or read only)
  const tx = contactDb.transaction("jate", "readwrite");

  // open up the desired object stored
  const store = tx.objectStore("jate");

  // use the .add() method on teh store and pass in the content
  const request = store.put({ id: 1, value: content });

  // get confirmation of the request
  const result = await request;
  console.log("data saved!", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from the database");

  // connect to the database and determine the version
  const contactDb = await openDB("jate", 1);

  // create a new transaction and specify the database and privileges (can write or read only)
  const tx = contactDb.transaction("jate", "readonly");

  // open up the desired object stored
  const store = tx.objectStore("jate");

  // use the .getAll() method to get all data in the database
  const request = store.getAll();

  // get confirmation of the request
  const result = await request;
  console.log("result value!", result);
  return result?.value;
};

initdb();
