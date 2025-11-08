import type React from "react";
import DisclosureUI from "./components/DisclosureUI";
import DialogBox from "./components/DialogBox";
import DropdownMenu from "./components/DropdownMenu";
import PopoverSideMenu from "./components/PopoverSideMenu";
import PopoverTabs from "./components/PopoverTabs";
import TabsUI from "./components/tabsUI";
import TransitionUI from "./components/TransitionUI";
import MyButton from "./components/MyButton";
import MyCheckbox from "./components/MyCheckbox";
import MyComboBox from "./components/MyComboBox";
import MyFieldset from "./components/MyFieldset";

function App() {
  let dialogApi: { open: () => void };

  return (
    <>
      <MyComboBox />
      <PopoverSideMenu />
      <PopoverTabs />
      <DisclosureUI />
      <DropdownMenu />
      <TabsUI />
      <div>
        <p className="text-amber-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          corporis assumenda quod harum. Consequuntur laboriosam quae fugiat
          doloremque, libero nemo id! Sapiente nemo perspiciatis sint vitae
          suscipit labore deserunt esse?
        </p>
      </div>
      <button
        onClick={() => dialogApi.open()}
        className="bg-sky-400 text-2xl text-slate-300 block px-2 py-1 rounded-lg hover:bg-sky-700"
      >
        Open Dialog
      </button>
      <DialogBox
        getApi={(api) => {
          dialogApi = api;
        }}
      ></DialogBox>
      <TransitionUI />
      <MyDiv>
        {Array.from("123").map((id) => (
          <MyBtn key={id} id={id}>
            Button {id}
          </MyBtn>
        ))}
      </MyDiv>
      <MyButton>{(isOpen) => <p>{isOpen ? "Open" : "Close"}</p>}</MyButton>
      <MyCheckbox />
      <MyFieldset />
    </>
  );
}

function MyDiv({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}

function MyBtn({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <button
      onClick={() => {
        alert(`Button ${id} Clicked!`);
      }}
    >
      {children}
    </button>
  );
}

export default App;
