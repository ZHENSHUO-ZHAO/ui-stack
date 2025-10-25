import type React from "react";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  return (
    <>
      <DropdownMenu />
      <div>
        <p className="text-amber-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          corporis assumenda quod harum. Consequuntur laboriosam quae fugiat
          doloremque, libero nemo id! Sapiente nemo perspiciatis sint vitae
          suscipit labore deserunt esse?
        </p>
      </div>
      <MyDiv>
        {Array.from("123").map((id) => (
          <MyBtn id={id}>Button {id}</MyBtn>
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
