#! /bin/sh

# this script runs the suggestion engine and runs the javascript

# get random prompt from a python or js script ?

# get random line from text file
prompt=$( shuf -n 1 "./prompts.txt" )

echo "${prompt}"

modelPath="/QuotesModel/Training-20EPOCHS/content/one_step"

python3 ./brain/main.py "${modelPath}" "${prompt}"