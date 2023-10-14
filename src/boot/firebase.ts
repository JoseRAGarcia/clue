import { boot } from "quasar/wrappers";
import { useFirebaseStore } from "stores/firebase";

const firebaseStore = useFirebaseStore();

export default boot(() => {
  firebaseStore.initializeApp();
});
