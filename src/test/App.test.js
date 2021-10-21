import React from "react";
import expect from "expect";
import App from "../App";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Banking Transactions <App/>", () => {
  it("check default/initial state of the application", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("tbody").text()).toEqual(
      "2019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.452019-12-01THE HACKERUNIVERSITY DES: CCD+ ID:0000232343Credit1000$12,234.452019-11-25HACKERBANK DES:DEBIT O ID: 0000987945787897987987Debit2450.45$12,234.452019-12-03HACKERBANK INC. DES:CCD+ ID: 33375894749Credit1985.4$12,234.452019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.452019-11-30CREDIT CARD PAYMENT ID: 222349083Debit1987$12,234.45"
    );
  });

  it("check filter by date", () => {
    const wrapper = mount(<App />);

    wrapper
      .find("input#date")
      .simulate("change", { target: { value: "2019-11-29" } });

    wrapper.find("button#filter").simulate("click");
    expect(wrapper.find("tbody").text()).toEqual(
      "2019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.452019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.45"
    );
  });

  it("check sorting by amount", () => {
    const wrapper = mount(<App />);

    wrapper.find("span#amount").simulate("click");
    expect(wrapper.find("tbody").text()).toEqual(
      "2019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.452019-12-01THE HACKERUNIVERSITY DES: CCD+ ID:0000232343Credit1000$12,234.452019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.452019-12-03HACKERBANK INC. DES:CCD+ ID: 33375894749Credit1985.4$12,234.452019-11-30CREDIT CARD PAYMENT ID: 222349083Debit1987$12,234.452019-11-25HACKERBANK DES:DEBIT O ID: 0000987945787897987987Debit2450.45$12,234.45"
    );
  });

  it("check filter by date and sorting by amount", () => {
    const wrapper = mount(<App />);

    wrapper
      .find("input#date")
      .simulate("change", { target: { value: "2019-11-29" } });

    wrapper.find("button#filter").simulate("click");
    wrapper.find("span#amount").simulate("click");

    expect(wrapper.find("tbody").text()).toEqual(
      "2019-11-29HACKERBANK DES: DEBIT O ID:00097494729Credit564$12,234.452019-11-29HACKERBANK1 BP DES: MERCH PMT ID:1358570Credit1520.34$12,234.45"
    );
  });

  it("check number of rows rendered", () => {
    const wrapper = mount(<App />);
    let el = wrapper.find("tr");
    expect(el.length).toEqual(7);
  });
});
