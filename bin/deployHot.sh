#!/bin/bash
cdk deploy
read VAR
echo Result $VAR
if test $VAR -gt 100
then
        echo "It's greater than 100"
fi
echo Bye
