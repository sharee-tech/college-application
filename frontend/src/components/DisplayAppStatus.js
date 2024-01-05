export function DisplayAppStatus({ status }) {
  const determineStatus = function() {
    switch (status) {
      case 0:
        return { label: "Researching", css: "text-bg-secondary" };
      case 1:
        return { label: "Applied", css: "text-bg-primary" };
      case 2:
        return { label: "Rejected", css: "text-bg-danger" };
      case 3:
        return { label: "Accepted", css: "text-bg-success" };
    }
  };

  return (
    <span className={`badge rounded-pill ${determineStatus().css} ml-4`}>
      {determineStatus().label}
    </span>
  );
}
