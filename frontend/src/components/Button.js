export default function Button({ children, onClick, css }) {
  return (
    <button
      // style={{ width: "100px" }}
      type="button"
      className={`btn ${css}`}
      onClick={onClick}
    >
      {" "}
      {children}
    </button>
  );
}
