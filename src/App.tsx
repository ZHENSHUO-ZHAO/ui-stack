import type React from "react";
import DisclosureUI from "./components/DisclosureUI";
import DialogBox from "./components/DialogBox";

function App() {
  let dialogApi: { open: () => void };

  return (
    <>
      <DisclosureUI />
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
        Open
      </button>
      <DialogBox
        getApi={(api) => {
          dialogApi = api;
        }}
      ></DialogBox>
      <MyDiv>
        {Array.from("123").map((id) => (
          <MyBtn key={id} id={id}>
            Button {id}
          </MyBtn>
        ))}
      </MyDiv>
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
