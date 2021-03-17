import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
test("Login button disappear", () => {
 const result = render(<App />);
  const LoginButtonElement = screen.getByText("Login")
  expect(LoginButtonElement).toBeInTheDocument();
  fireEvent.click(LoginButtonElement);
  expect(LoginButtonElement).not.toBeInTheDocument();
  const gameboard = screen.getByTestId("boardid")
  expect(gameboard).toBeInTheDocument()
});



  test("leaderboard appears",()=>{
  const result = render(<App />);
  
 
  const LoginButtonElement = screen.getByText("Login")
  expect(LoginButtonElement).toBeInTheDocument();
  fireEvent.click(LoginButtonElement);
  const ShowLeaderButtonElement = screen.getByText("Show Leaderboard")
  expect(ShowLeaderButtonElement).toBeInTheDocument()
  fireEvent.click(ShowLeaderButtonElement)
  const rank = screen.getByText("Rank")
  const username = screen.getByText("Username")
  const score = screen.getByText("Score")
  expect(rank).toBeInTheDocument()
  expect(username).toBeInTheDocument
  expect(score).toBeInTheDocument()

})

test("to check if ther is nextplayer,players and Spectators",()=>{
   const result = render(<App />);
   
  const LoginButtonElement = screen.getByText("Login");
  expect(LoginButtonElement).toBeInTheDocument();
  fireEvent.click(LoginButtonElement); 
 
  const nextplayer = screen.getByText("Next Player: PlayerX")
  const players =screen.getByText("Players:")
  const spect = screen.getByText("Spectators:")
  expect(nextplayer).toBeInTheDocument()
  
})