<script setup lang="ts">
import type { ConfigData, NewEvent } from "@/types";
import type { DateSelectArg } from "@fullcalendar/core";

const props = defineProps<{
  metaData: DateSelectArg | null;
  blocks: ConfigData["blocks"];
  noRoom?: boolean;
}>();

const emit = defineEmits<{
  (event: "submit", value: NewEvent): void;
  (event: "cancel"): void;
}>();

const newEvent = ref<NewEvent>({
  name: "",
  room: null,
  block: {
    start: "",
    end: "",
  },
});

const clear = () => {
  newEvent.value = {
    name: "",
    room: null,
    block: {
      start: "",
      end: "",
    },
  };
};

const isDisabled = computed(
  () =>
    !newEvent.value.name ||
    (!newEvent.value.room && !props.noRoom) ||
    !newEvent.value.block.start ||
    !newEvent.value.block.end,
);

defineExpose({
  clear,
});
</script>

<template>
  <div class="card bg-base-300 border">
    <div class="card-body">
      <div class="form-control gap-2">
        <h2 class="text-2xl font-bold">New booking</h2>
        <span>{{ $dayjs(metaData?.start).format("dddd, MMMM DD") }}</span>
        <!-- Info -->
        <InputBasic type="text" placeholder="Name" v-model="newEvent.name" />
        <input
          class="input input-bordered"
          type="number"
          inputmode="numeric"
          v-model="newEvent.room"
          placeholder="Room Number"
          pattern="[0-9]*"
          maxlength="4"
          v-if="!noRoom"
        />

        <select
          tabindex="0"
          v-model="newEvent.block.start"
          class="select select-bordered w-full"
          ref="select"
          @change="newEvent.block.end = newEvent.block.start"
        >
          <option value="" disabled selected hidden>Select an option</option>
          <option
            v-for="option in blocks"
            :key="option.name"
            tabindex="1"
            class="text-lg"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
        <select
          tabindex="0"
          v-model="newEvent.block.end"
          class="select select-bordered w-full"
          ref="select"
        >
          <option value="" disabled selected hidden>Select an option</option>
          <option
            v-for="option in blocks"
            :key="option.name"
            tabindex="1"
            class="text-lg"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>

        <div class="grid grid-cols-2 gap-2">
          <Button
            class="btn-success w-full"
            @click="emit('submit', newEvent)"
            tooltip="Confirm"
            :disabled="isDisabled"
          >
            <Icon name="mdi:check" />
          </Button>
          <Button
            class="btn-error w-full"
            @click="
              clear();
              emit('cancel');
            "
            tooltip="cancel"
          >
            <Icon name="mdi:cancel" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
