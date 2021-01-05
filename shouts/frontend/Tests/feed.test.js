import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Feed from "../src/components/Feed/Feed";
const mockStore = configureMockStore();
const store = mockStore({});
describe("Feed Component", () => {
    const props = {
      profiles:{
          
      }
    };
  it("Should display Feed Component", () => {
    render(
      <Provider store={store}>
        <Feed {...props} />
      </Provider>
    );
  });
});
