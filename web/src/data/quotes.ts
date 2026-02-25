export const quotes: string[] = [
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"The best way to predict the future is to implement it." — David Heinemeier Hansson',
  '"Clean code always looks like it was written by someone who cares." — Robert C. Martin',
  '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"The only way to go fast is to go well." — Robert C. Martin',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Testing leads to failure, and failure leads to understanding." — Burt Rutan',
  '"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry',
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson',
  '"The function of good software is to make the complex appear to be simple." — Grady Booch',
  '"Before software can be reusable it first has to be usable." — Ralph Johnson',
  '"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." — John Woods',
  '"Measuring programming progress by lines of code is like measuring aircraft building progress by weight." — Bill Gates',
  '"Walking on water and developing software from a specification are easy if both are frozen." — Edward V. Berard',
  '"The most important property of a program is whether it accomplishes the intention of its user." — C.A.R. Hoare',
  '"Debugging is twice as hard as writing the code in the first place." — Brian W. Kernighan',
  '"A long descriptive name is better than a short enigmatic name." — Robert C. Martin',
  '"Good code is its own best documentation." — Steve McConnell',
  '"The amateur practices until he gets it right. The professional practices until he can\'t get it wrong." — Unknown',
  '"Don\'t comment bad code — rewrite it." — Brian W. Kernighan',
  '"Every great developer you know got there by solving problems they were unqualified to solve until they actually did it." — Patrick McKenzie',
  '"Discipline is the bridge between goals and accomplishment." — Jim Rohn',
  '"Success is the sum of small efforts repeated day in and day out." — Robert Collier',
  '"You don\'t have to be great to start, but you have to start to be great." — Zig Ziglar',
  '"The secret of getting ahead is getting started." — Mark Twain',
  '"Consistency is what transforms average into excellence." — Unknown',
  '"One test is worth a thousand expert opinions." — Wernher von Braun',
];

export const getDailyQuote = (): string => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return quotes[dayOfYear % quotes.length];
};
