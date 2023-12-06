<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

definePageMeta({
  layout: "cardless",
  requiresAuth: false,
});

// // data
// const error = ref({
//   message: "",
//   status: "",
// });

// const ignoreErrorCode = [
//   "auth/account-exists-with-different-credential",
//   "auth/credential-already-in-use",
//   "auth/cancelled-popup-request",
//   "auth/popup-closed-by-user",
// ];

// const router = useRouter();
// const route = useRoute();
// const auth = useFirebaseAuth()!;
// const provider = new GoogleAuthProvider();

// // lifecycle
// onMounted(async () => {
//   const currentUser = await getCurrentUser();
//   if (currentUser) {
//     const to =
//       route.query.redirect && typeof route.query.redirect === "string"
//         ? route.query.redirect
//         : "/";

//     router.push(to);
//   }
// });

// const signIn = () => {
//   signInWithPopup(auth, provider)
//     .then(() => {
//       navigateTo("/");
//     })
//     .catch((err) => {
//       if (!ignoreErrorCode.includes(err.code)) {
//         try {
//           const { error } = JSON.parse(err.message.match(/{.*}/g));
//           error.value = error;
//         } catch {
//           error.value = {
//             message: err.message,
//             status: err.code,
//           };
//         }
//       }
//     });
// };
</script>

<template>
  <div class="flex items-center justify-center align-middle">
    <div class="card sm:shadow-lg bg-base-100">
      <div class="card-body">
        <button class="btn">
          <Icon name="devicon:google" />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
