<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";

definePageMeta({
  layout: "cardless",
  requiresAuth: false,
  noBreadCrumbs: true,
});

// data
const error = ref({
  message: "",
  status: "",
});

const credentials = ref({
  email: "",
  password: "",
});

const router = useRouter();
const route = useRoute();
const auth = useFirebaseAuth()!;

// lifecycle
onMounted(async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    const to =
      route.query.to && typeof route.query.to === "string"
        ? route.query.to
        : "/";

    router.push(to);
  }
});

const signIn = () => {
  signInWithEmailAndPassword(
    auth,
    credentials.value.email,
    credentials.value.password,
  )
    .then((userCredential) => {
      const user = userCredential.user;
      const to =
        route.query.to && typeof route.query.to === "string"
          ? route.query.to
          : "/";

      router.push(to);
    })
    .catch((error) => {
      error.value = {
        message: error.message,
        status: error.code,
      };
    });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center align-middle">
    <div class="card sm:shadow-lg bg-base-100">
      <div class="card-body">
        <InputBasic
          type="text"
          placeholder="Email"
          v-model="credentials.email"
        />
        <InputBasic
          type="password"
          placeholder="Password"
          v-model="credentials.password"
        />
        <button class="btn btn-primary" @click="signIn">Sign In</button>
      </div>
    </div>
  </div>
</template>
