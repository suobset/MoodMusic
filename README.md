# HackUmass IX: Nov 5-7, 2021

## A mostly complete, everchanging, intermediate guide to setting up for any code competition.

But we will use it for HackUmass IX 

(shitty brainstorm ideas thrown into the mix as well)

PS: it's long because I intend to use it for other purposes in the future too :) -Kush

<hr>

## Initial Setup 

* It is often recommended to use git in a Linux environment, preferably something like: 
  * <a href="https://docs.microsoft.com/en-us/windows/wsl/about">WSL</a> if running on Windows,
  * <a href="https://www.zsh.org/">zsh</a> if running macOS, 
  * or Bash on a proper Linux computer (not a VM). 
* <b><u>For Windows</u></b>, ```WSL``` however has some drawbacks, including using various bodges to make VSCode think it's a remote computer; not being able to use other IDEs without your literal terminal open on the side, etc. Soltion:
  * Install <a href="https://code.visualstudio.com/">VSCode</a> (will be important for our git setup later | also super important everywhere else).
  * <a href="https://gitforwindows.org/">Git for Windows</a>. Asks a lot of opions, just roll with whatever is already selected. Select Visual Studio Code when asks for primary editor. 
  * <a href="https://desktop.github.com/">GitHub Desktop Client</a> 
  * (Note: while the ```git for windows``` setup installs ```git bash``` on your computer, that terminal can only be used for git stuff. It is better to just use your default Terminal even for git, instead of opening like two terminals and a code editor/IDE. Likewise, it is always the best to just use the GitHub desktop client for all your git needs: we only have 48-ish hours, we cannot play mental gymnastics)
  * Get a better Terminal. I think the best one is <a href="https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab">Windows Terminal (yes, the only way to get it is using the Microsoft Store)</a>. Trust me when I say you don't want to look at that ugly blue PowerShell screen for 48 hours of your life. 
* <b><u>For macOS and/or any Linux distribution</u></b>: ```zsh``` and ```bash``` are good, however keep in mind to install:
  * git:
    * ```brew install git``` (for macOS)
    * ```sudo apt install git``` (for any Debian based Linux distro: includes Ubuntu and Pop!_OS)
    * ```sudo yum install git``` (RedHat, Fedora, SUSE, and based Linux distros)
  * <a href="https://desktop.github.com/">GitHub Desktop Client</a>
  * <a href="https://code.visualstudio.com/">VSCode</a>
  * For macOS, get a better Terminal, something like <a href="https://iterm2.com/">iTerm2</a>. The default Terminal is good, but not great. A larger emphasis is placed on the Terminal for macOS since it is already UNIX based, which means that a lot of what has to be installed and used separately in Windows is already there in macOS. 
* Continuation for Windows: there is a slight chance that we may need to use a Linux environment to develop. <u><b>The following steps do not need to be done right now</b></u>, but if the Linux-development-thingy ever is the case:
  * Install <a href="https://docs.microsoft.com/en-us/windows/wsl/install">the Windows Subsystem for Linux (WSL)</a>. It is basically a Linux Terminal running on your Windows Machine. All folders can be accessed as usual, and everything can be done as usual. You get best of both the worlds. 
  * Get a Linux Distro (need to download from the Microsoft Store, since it will only be the CLI version). If this is your first time, <a href="https://www.microsoft.com/store/productId/9NBLGGH4MSV6">here's a link to Ubuntu 20.04 LTS</a>. 
  * Now, we go back to our Terminal. If you're using Windows Terminal, you'll see a drop down menu by the new tab page, click on it and click on Ubuntu. If you're using the regular Powershell terminal and/or Command Prompt (please don't use this), just type ```wsl```. 
  * You should get an output like this:
  * 
    ```
    Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 4.4.0-19041-Microsoft x86_64)

    * Documentation:  https://help.ubuntu.com
    * Management:     https://landscape.canonical.com
    * Support:        https://ubuntu.com/advantage

      System information as of Tue Oct 26 14:18:29 EDT 2021

      System load:    0.52      Processes:              7
      Usage of /home: unknown   Users logged in:        0
      Memory usage:   30%       IPv4 address for wifi0: 172.30.193.234
      Swap usage:     0%

    148 updates can be installed immediately.
    65 of these updates are security updates.
    To see these additional updates run: apt list --upgradable


    The list of available updates is more than a week old.
    To check for new updates run: sudo apt update


    This message is shown once a day. To disable it please create the
    /home/kush/.hushlogin file.

    kush@DESKTOP-UL26M6Q:/mnt/c/Users/lawye$
    ```
   * Notice for the command line input, the computer's usual syntax is ```username@desktop: /fileDirectory$ //your input here//```
   * If you ```cd``` to WSL's root directory and want to see wth it is: open File Explorer and type this in the File Path Area: ```\\wsl$``` | Usually, this gives you the base directory of your OS (If prior steps followed, Ubuntu in our case). Most of the time, you can just go to ```Ubuntu -> home -> username -> //Use Ubuntu like a regular OS from hereon//```. 
   * However by default, WSL starts from your Window's home directory (notice output above). The reasn it starts from ```\mnt``` is because from the perspective of Linux, Windows is the "mounted" drive. However, just ignore, and ```cd``` into your documents, folders, whatever. All that stuff lives directly on Windows (this is what we will do most probably). 
   * Follow the steps for macOS and/or Linux as stated above.
   * Lastly, we need to make ```WSL``` wrk with VSCode. Hit extensions on the sidebar, and type WSL. Download ```Remote - WSL```, or <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl">here's a link</a>.
   * Let VSCode restart. Tap on the green button on the bottom left corner, and hit ```New WSL Window```. It will open a new Window, and you can use VSCode, the embedded terminal, and all features directly from Ubuntu and just not care about Windows. 
   * Should this be done, make sure to follow instructions for macOS/Linux hereon.
<hr>

## git basics

* Obviously we will use git, but to save everyone's sanity le's try to avoid the terminal. 
  * Sign into the Github desktop app. Create a new account if you don't have one. 
  * Select any option that resembles ```clone a repository```, navigate to the one we are using (check your inbox for an invite ig, or paste the link).
  * Open with VSCode or whatever editor/IDE/tool you like
  * Try to make some changes. You'll see that as soon as you save it, the GitHub desktop app will pick it up. Once you're done coding and saved it, come back to the Github desktop app, write a commit message on the bottom left textbox (basically write what you did, and additional comments). 
  * You'll then get a button called ```push``` or something. Click on it, and you should see your contributions on our shared repository. Congratulations. 
* The flip side: how to get other people's contributions on your computer:
  * On the top bar of the github client, there's this button called ```fetch origin```
  * Once you do that, you should get a button called something like ```pull``` (if changes to the repository have been made). 
  * You should hopefully see other people's contributions. There's however just one exception:
* Code Review, Merge, and Branching
  * If, let's say, two of us were working on the same file, and one person makes a commit and pushes earlier. This is a conflict, since edits were made to that file, but you don't have those edits, and so on. 
  * The desktop client will prompt you to continue a merge. If you're confident enough about the code, go forward and continue it. 
  * Open in VSCode (the dialog box will have an option). 
  * You'll see your edits in a different colour, and the other edits in another. There are 4 self-explanatory buttons above the code in VSCode:
    * Accept your changes
    * Accept the other changes (or similar)
    * Accept Both Changes
    * Discard all 
  * We trust your judgement (otherwise just communicate with us). :D
  * Once that is done, return to the desktop client, and just continue the push as usual. 
  * I will spare branching for now, since I think we won't need it tbh. 
* Issue Tracking:
  * Go to our repository on a web browser, and click on issues
  * You can create a new issue there, and solve other issues. The whole thing is super self explanatory, and it is a great way for us to document all our issues and work through them. 
  * Once an issue is resolved, make sure to close it :D
  * Need help?? Let's talk!!! :)
* Lastly, some good resources:
  * <a href="https://about.gitlab.com/images/press/git-cheat-sheet.pdf">Git Cheat Sheet</a> (mostly required if you do git from a terminal).
  * <a href="http://greenrivertech.net/resources/GitHub-Cheat-Sheet.pdf">GitHub Cheat Sheet</a>
<hr>

* Not diving into languages just yet. Let's discuss projects first, and then we will think about what language to use and what resources to download. 
* For most of our endeavours, VSCode should be fine. However, just leaving a note for a possible future:
  * <a href="https://developer.android.com/studio">Android Studio</a> (for Android app dev) | requires extensive Java, Kotlin, and frontend stuff (google XML and XML for Android UI/UX).
  * <a href="https://developer.apple.com/xcode/">XCode</a>, <a href="https://developer.apple.com/swift">Swift</a>, and a Mac (for iOS app dev) | requires a lot of Objective-C (backend), and Swift (frontend). 
  * If we do web dev, VSCode is great. | requires HTML/CSS, and JavaScript. If ambitious, can use Python for simulations and ML stuff. (For JavaScript, let's stick to <a href="https://nodejs.org/en/">node.js</a> + <a href="https://www.npmjs.com/">npm</a>. Can use Angular/React/any other version too; open to discussion).
  * On the same tangent, if we do use Python for anything, VSCode should still be fine. However, <a href="https://www.jetbrains.com/pycharm/">PyCharm</a> is a great alternative too (but only if it's almost all Python). I assume most of our projects to have it rather embedded on some other platform, so the former 3 options stand more than PyCharm. 
  * More on web dev: can use tools like .NET, AWS, Google Cloud, etc. Probably gonna use proper Visual Studio if that's the case, or something from JetBrains (refer next point).
  * The only one drawback of VSCode is that it's a one size fits all thing. Sure, it has every language and works amazingly well. But sometimes, it can be a drawback. For that, <a href="https://www.jetbrains.com/">JetBrains</a> (creators of Android Studio and PyCharm, along with various others), has a <a href="https://www.jetbrains.com/community/education/#students">Student License</a> where you can download all their IDEs and tools for free. Keep in mind that they still are highly professional tools with a good learning curve. Personally, I believe that VSCode should be awesome for our 36-48 hours of code, but I'm just leaving this as an option, should you be interested. 
  * Honestly, it doesn't even matter what you really use. I have built some great stuff using only Notepad (no, seriously). Just pick whatever tool is the most comfortable to you, and is the most comfortable for the project we have at hand.  
* <b>WE DO NOT NEED TO DO ANY OF THIS RN</b>. Appropiate steps and resources will be added to this document once we finalize a project and decide upon a language and everything. The note seems like less, but keep in mind we not only have to install the tool, but also the languages working behind the same. Hence, we decide a project, finalize upon it, and then only install the required stuff (which again, I will add the steps and resources for here). 

<hr>

## Documentation (for the tools we use)

* Based on what we are using so far, and ignoring the last note:
  * <a href="https://git-scm.com/doc">git</a>. Alternatively, open up a terminal and write ```man git```. Type ```man man``` for more info. 
  * <a href="https://docs.github.com/en">GitHub</a>
  * <a href="https://docs.github.com/en/desktop">GitHub Desktop Client</a>
  * <a href="https://code.visualstudio.com/docs">VSCode</a>
  * <a href="https://zsh.sourceforge.io/Doc/">zsh</a>
  * <a href="https://docs.microsoft.com/en-us/windows/wsl/about">WSL</a>

<hr>

<h2><b>DOCUMENT WORK IN PROGRESS AS WE DISCUSS PROJECTS AND EVERYTHING</b></h2>