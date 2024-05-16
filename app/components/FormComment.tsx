export default function FormComment() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("OOOOOOOOOK");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input type="text" />
        <button>ok</button>
      </form>
    </div>
  );
}
