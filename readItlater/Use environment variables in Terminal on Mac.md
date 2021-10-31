[[ReadItLater]] [[Article]]

# [Use environment variables in Terminal on Mac](https://support.apple.com/en-gb/guide/terminal/apd382cc5fa-4f58-4449-b20a-41c53c006f8f/mac)

![](https://help.apple.com/assets/5FDD15EE12A93C067904695E/5FDD15F412A93C0679046966/en_GB/20f5edbfdfa0bd8ad4c4c6452e5b6761.png)

The shell uses environment variables to store information, such as the name of the current user, the name of the host computer, and the default paths to any commands. Environment variables are inherited by all commands executed in the shell’s context, and some commands depend on environment variables.

You can create environment variables and use them to control the behaviour of a command without modifying the command itself. For example, you can use an environment variable to have a command print debug information to the console.

To set the value of an environment variable, use the appropriate shell command to associate a variable name with a value. For example, to set the variable _PATH_ to the value `/bin:/sbin:/user/bin:/user/sbin:/system/Library/`, you would enter the following command in a Terminal window:

`% PATH=/bin:/sbin:/user/bin:/user/sbin:/system/Library/ export PATH`

To view all environment variables, enter:

`% env`

When you launch an app from a shell, the app inherits much of the shell’s environment, including exported environment variables. This form of inheritance can be a useful way to configure the app dynamically. For example, your app can check for the presence (or value) of an environment variable and change its behaviour accordingly.

Different shells support different semantics for exporting environment variables. See your preferred shell’s man page.

Although child processes of a shell inherit the environment of that shell, shells are separate execution contexts that don’t share environment information with each other. Variables you set in one Terminal window aren’t set in other Terminal windows.

After you close a Terminal window, variables you set in that window are no longer available. If you want the value of a variable to persist across sessions and in all Terminal windows, you must set it in a shell startup script. For information about modifying your zsh shell startup script to keep variables and other settings across multiple sessions, see the “Invocation” section of the [zsh man page](x-man-page://zsh).