### Command Button

Open the previous day's daily note using the Periodic Notes Plugin:

```button  
name Open Previous Daily Note  
type command  
action Periodic Notes: Open previous daily note  
```  
^button-previous

Turn spellcheck on/off:

```button  
name Toggle spellcheck  
type comand  
action Toggle spellcheck  
color blue  
```  
^button-spellcheck

### [](https://github.com/shabegom/buttons#link-button)Link Button

Open the Obsidian Forum:

```button  
name To the Forum Batman!  
type link  
action [forum.obsidian.md](https://forum.obsidian.md/)  
```  
^button-forum

### [](https://github.com/shabegom/buttons#template--line-button)Template & Line Button

#### [](https://github.com/shabegom/buttons#append)Append

Append a Log Template Note:

```button  
name Log  
type append template  
action Hourly Log Template Note  
```  
^button-log

Append the current time:

```button  
name Log  
type append text  
action <% tp.date.now("HH:mm") %>  
templater true  
```

#### [](https://github.com/shabegom/buttons#prepend-template)Prepend Template

Replace a Weather Template Note with the updated Weather:

```button  
name Current Weather  
type prepend template  
action Weather Template Note  
replace [1,5]  
```  
^button-weather

Prepend a weekly todo list and remove other buttons

```button  
name Monday List  
type prepend template  
action Monday Template Note  
remove [mon,tues,wed]  
```  
^button-mon

```button  
name Tuesday List  
type prepend template  
action Tuesday Template Note  
remove [mon,tues,wed]  
```  
^button-tues

```button  
name Wednesday List  
type prepend template  
action Wednesday Template Note  
remove [mon,tues,wed]  
```  
^button-wed

Event better, setup those buttons and then add them all on one line as Inline Buttons:

`button-mon` `button-tues` `button-wed`

### [](https://github.com/shabegom/buttons#add-template-at-line)Add Template at Line

Say you want the weather to appear at a specific place in your note that isn't directly beside the button:

```button  
name Current Weather  
type line(1) template  
action Weather Template Note  
replace [1,5]  
```  
^button-weatherLine

#### [](https://github.com/shabegom/buttons#new-note-from-template)New Note From Template

Create a new note for an upcoming meeting based on a Meeting Note Template:

```button  
name New Meeting  
type note(Meeting, split) note  
action Meeting Note Template  
```  
^button-meeting

Dynamically add the hour and minute to the note title:

```button  
name New Meeting  
type note(Meeting-<%tp.date.now("HH-MM") %>, split) note  
action Meeting Note Template  
templater true ```  
^button-meeting2