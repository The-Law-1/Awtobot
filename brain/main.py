#! /usr/bin/python3

import tensorflow as tf
import sys
import os

av = sys.argv
ac = len(av)

# generate current path

pwd = os.path.dirname(os.path.realpath(__file__))

modelPath = pwd + "/QuotesModel/Training-20EPOCHS/content/one_step"
prompt = "A lonesome hero"
outputFile = pwd + "/output.txt"

if (ac > 1):
    modelPath = pwd + av[1]
if (ac > 2):
    prompt = av[2]
if (ac > 3):
    outputFile = pwd + av[3]

suggestions = 3
tokens = 100

one_step_reloaded = tf.saved_model.load(modelPath)

states = None

prediction = ""

for i in range(suggestions):
    next_char = tf.constant([prompt])

    result = [next_char]

    for n in range(100):
        next_char, states = one_step_reloaded.generate_one_step(next_char, states=states)
        result.append(next_char)

    prediction += ("\n\n" + tf.strings.join(result)[0].numpy().decode("utf-8"))

# split string at \n
# prediction = prediction.split("\n")
# prediction = prediction.split(".")

# write prediction to file
with open(outputFile, "w+") as f:
    f.write(prediction)
