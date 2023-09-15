import { mount, shallowMount } from "@vue/test-utils";
import { expect, test, describe, beforeEach, vitest } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Login from "@/components/Login.vue";
import { createTestingPinia } from "@pinia/testing";

const vuetify = createVuetify({
  components,
  directives,
});

describe("Login", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [vuetify, createTestingPinia({ createSpy: vitest.fn })],
      },
    });
  });

  test("login_button_is_enabled_if_user_and_pass_has_values", async () => {
    // const store = useAppStore();
    await wrapper.find('[name="username"]').setValue("user1@fake.com");
    await wrapper.find('[name="password"]').setValue("1234");
    const loginButton = wrapper.find('[data-test="login"]');
    expect(loginButton.classes()).not.toContain("v-btn--disabled");
  });
});
