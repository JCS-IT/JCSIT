<script setup lang="ts">
import type { ConfigData, NewEvent } from "@/types";
import type { DateSelectArg } from "@fullcalendar/core";

const props = defineProps<{
  metaData: DateSelectArg | null;
  blocks: ConfigData["blocks"];
  room?: boolean;
}>();

const emit = defineEmits<{
  (event: "submit", value: NewEvent): void;
  (event: "cancel"): void;
}>();

const options = Object.keys(props.blocks);

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
    !newEvent.value.room ||
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
        <InputBasic
          type="number"
          placeholder="Room Number"
          v-model="newEvent.room"
          v-if="!room"
        />

        <!-- Blocks -->
        <InputDropdown
          :options="options"
          placeholder="Start block"
          v-model="newEvent.block.start"
          @change="newEvent.block.end = newEvent.block.start"
        />
        <InputDropdown
          :options="options"
          placeholder="End block"
          v-model="newEvent.block.end"
        />
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
