# HackUmassIX: Nov 5-7, 2021

## A mostly complete, everchanging, intermediate guide to setting up for any code competition.

But we will use it for HackUmass IX 

(shitty brainstorm ideas thrown into the mix as well)

<hr>

## Initial Setup 

* It is recommended to use git in a Linux environment, preferably something like: 
  * <a href="https://docs.microsoft.com/en-us/windows/wsl/about">WSL</a> if running on Windows,
  * <a href="https://www.zsh.org/">zsh</a> if running macOS, 
  * or Bash on a proper Linux computer (not a VM). 
* For Windows, ```WSL``` however has some drawbacks, including using various bodges to make VSCode think it's a remote computer; not being able to use other IDEs without your literal terminal open on the side, etc. Soltion:
  * Install <a href="https://code.visualstudio.com/">VSCode</a> (will be important for our git setup later | also super important everywhere else).
  * <a href="https://gitforwindows.org/">Git for Windows</a>. Asks a lot of opions, just roll with whatever is already selected. Select Visual Studio Code when asks for primary editor. 
  * <a href="https://desktop.github.com/">GitHub Desktop Client</a> 
  * (Note: while the ```git for windows``` setup installs ```git bash``` on your computer, that terminal can only be used for git stuff. It is better to just use your default Terminal even for git, instead of opening like two terminals and a code editor/IDE. Likewise, it is always the best to just use the GitHub desktop client for all your git needs: we only have 48-ish hours, we cannot play mental gymnastics)
  * Get a better Terminal. I think the best one is <a href="https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab">Windows Terminal (yes, the only way to get it is using the Microsoft Store)</a>. Trust me when I say you don't want to look at that ugly blue PowerShell screen for 48 hours of your life. 
* For macOS and/or any Linux distribution: ```zsh``` and ```bash``` are good, however keep in mind to install:
  * git:
    * ```brew install git``` (for macOS)
    * ```sudo apt install git``` (for any Debian based Linux distro: includes Ubuntu and Pop!_OS)
    * ```sudo yum install git``` (RedHat, Fedora, SUSE, and based Linux distros)
  * <a href="https://desktop.github.com/">GitHub Desktop Client</a>
  * <a href="https://code.visualstudio.com/">VSCode</a>
  * For macOS, get a better Terminal, something like <a href="https://iterm2.com/">iTerm2</a>. The default Terminal is good, but not great. A larger emphasis is placed on the Terminal for macOS since it is already UNIX based, which means that a lot of what has to be installed and used separately in Windows is already there in macOS. 

WORK IN PROGRESS
