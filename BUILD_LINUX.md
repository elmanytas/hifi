# Linux build guide

Please read the [general build guide](BUILD.md) for information on dependencies required for all platforms. Only Linux specific instructions are found in this file.

## Qt5 Dependencies

Should you choose not to install Qt5 via a package manager that handles dependencies for you, you may be missing some Qt5 dependencies. On Ubuntu, for example, the following additional packages are required:
```
libasound2 libxmu-dev libxi-dev freeglut3-dev libasound2-dev libjack0 libjack-dev libxrandr-dev libudev-dev libssl-dev
```

## Ubuntu 16.04 specific build guide

### Prepare environment

#### Install qt

##### Ubuntu 16.04 and Debian Stretch in desktop

* Download *qt-opensource-linux-x64-5.9.1.run* from [QT Downloads](https://download.qt.io/official_releases/qt/5.9/5.9.1/) ( [direct link](http://www.mirrorservice.org/sites/download.qt-project.org/archive/qt/5.9/5.9.1/qt-opensource-linux-x64-5.9.1.run) ).
* chown +x qt-opensource-linux-x64-5.9.1.run
* Install qt: ./qt-opensource-linux-x64-5.9.1.run
  * Use as installation directory: $HOME/Qt
  * Install ALL features

##### Ubuntu 17.10 and Debian Buster


#### Install build dependencies
```bash
sudo apt-get install libasound2 libxmu-dev libxi-dev freeglut3-dev libasound2-dev libjack0 libjack-dev libxrandr-dev libudev-dev libssl-dev qt*5-dev
```

To compile interface in a server you must install:
```bash
sudo apt -y install libpulse0 libnss3 libnspr4 libfontconfig1 libxcursor1 libxcomposite1 libxtst6 libxslt1.1 libqt5quick5 libqt5websockets5-dev libqt5xmlpatterns5-dev libqt5svg5-dev
```

Install build tools:
```bash
sudo apt install cmake build-essential
```

### Get code and checkout the tag you need

Clone this repository:
```bash
git clone https://github.com/highfidelity/hifi.git
```

To compile a RELEASE version checkout the tag you need getting a list of all tags:
```bash
git fetch -a
git tags
```

Then checkout last tag with:
```bash
git checkout tags/RELEASE-6819
```

Or go to the highfidelity download page (https://highfidelity.com/download) to get the release version. For example, if there is a BETA 6731 type:
```bash
git checkout tags/RELEASE-6731
```

### Compiling

Create the build directory:
```bash
mkdir -p hifi/build
cd hifi/build
```

Prepare makefiles:
```bash
export QT_CMAKE_PREFIX_PATH=$HOME/Qt/5.9.1/gcc_64/lib/cmake/
cmake ..
```

Start compilation and get a cup of coffee:
```bash
make domain-server assignment-client interface
```

In a server does not make sense to compile interface

### Running the software

Running domain server:
```bash
./domain-server/domain-server
```

Running assignment client:
```bash
./assignment-client/assignment-client -n 6
```

Running interface:
```bash
./interface/interface
```

Go to localhost in running interface.
