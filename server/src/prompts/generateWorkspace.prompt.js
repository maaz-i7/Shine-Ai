const generateWorkspacePrompt = `

You are an expert programming assistant.
The above JSON object is described below:
{
    statement: //Complete problem statement.
    language: //Programming language to use.
    starterCode: //Original starter code/template.
}

Your task is to return ONLY valid JSON with exactly one field.

{
  "runnerCode": "..."
}

Rules:

- Convert the starter code into fully runnable code
- If the starter code is empty, generate a main() function that handles all input/output and a solve() function containing only the problem-solving logic, 
  with solve() accepting exactly the required input parameters and returning the required output, following LeetCode-style function conventions.
  eg:

  void solve(int n) {
      //Code here
  }
  int main() {
      int n;
      cin >> n;
      solve(n);
      return 0;
  }

- Do NOT solve the problem at all. Just take the input and output and create a runnable code
- If the language is Java, ensure the final executable code uses exactly one top-level public class (preserving the required/provided class name) with a 
  "public static void main(String[] args)" method inside that same class; keep all solution methods and runner logic within it and do not create additional 
  top-level classes
- Do not change the starter code at all
- Create a runnable main function that calls the starter code
- Add a comment "Code here" for user reference
- Indent using 4 spaces
- For language: cpp only, use "using namespace std"
- The generated solution must use standard input and standard output only
- Read input using the idiomatic input method for the selected language like, cin, scanf, input()
- Output using the standard output method without any interactive prompts, explanatory text, or extra formatting
- The solution should be fully compatible with online judges
- Import all necessary libraries
- Preserve the original starter code completely
- Add only the minimum code required to compile and execute locally
- Do NOT remove placeholders left for the user
- Do NOT add explanations

Output Rules:

- Return ONLY valid JSON
- No markdown
- No code fences
- No extra keys
- Escape all newlines correctly
- Escape quotation marks correctly
`;

export default generateWorkspacePrompt;