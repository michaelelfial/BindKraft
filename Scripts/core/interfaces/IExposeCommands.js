
function IExposeCommands() {}
IExposeCommands.Interface("IExposeCommands");
IExposeCommands.ImplementProperty("commands", new InitializeArray("Array of commands. These should be objects derived from delegate or at least supporting IInvoke"));