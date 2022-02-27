import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export const DeleteDoc = async (folder, id) => {
    await deleteDoc(doc(db, folder, id));
}