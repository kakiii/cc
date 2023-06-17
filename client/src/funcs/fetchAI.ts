const fetchAIResponse = async (divID: string, selectedOption: string) => {
  try {
    const queryParams = new URLSearchParams({
      scene: divID.toString(),
      choice: selectedOption,
    });
    const response = await fetch(`/chatgpt/response?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.content.rationale;
    } else {
      throw new Error("Response not ok");
    }
  } catch (err) {
    console.error(err);
  }
// if (divID && selectedOption) {
//   return "This is a test response.";
// }else{
//     return "Error: divID or selectedOption not defined.";
// }
};

export default fetchAIResponse;
