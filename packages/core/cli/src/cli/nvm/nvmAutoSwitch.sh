#
# Run 'nvm use' automatically every time there's
# a .nvmrc file in the directory. Also, revert to default
# version when entering a directory without .nvmrc
# @coffeekraken.cli.nvm.autoSwitch
#
nvm_autouse() {
    if [[ $PWD == $PREV_PWD ]]; then
        return
    fi
    PREV_PWD=$PWD

    nvmrcPath=$(find "$PWD" -maxdepth 1 -name ".nvmrc")
    nvmVersion=""
    nodeVersion=$(node --version | sed 's/v//g')

    if [[ $nvmrcPath == "" ]]; then
        x=$(pwd)
        while [ "$x" != "/" ] ; do
            x=`dirname "$x"`
            nvmrcPath=$(find "$x" -maxdepth 1 -name ".nvmrc")
            if [[ $nvmrcPath != "" ]]; then
                break
            fi
        done
    fi

    if [[ $nvmrcPath != "" ]]; then
        nvmVersion=$(cat $nvmrcPath)
    fi

    if [[ $nvmrcPath != "" ]]; then
        if [[ $nvmVersion != $nodeVersion ]]; then
            echo "Found .nvmrc file under ${nvmrcPath}"
            nvm install $nvmVersion
        fi
        NVM_DIRTY=true
    elif [[ $NVM_DIRTY = true ]]; then
        echo "Restoring node version to default"
        nvm use default
        NVM_DIRTY=false
    fi
}
nvm_autouse
# nvm_autouse &>/dev/null
chpwd_functions=(${chpwd_functions[@]} "nvm_autouse")