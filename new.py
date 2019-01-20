# import sys
# import numpy as np
# # Takes first name and last name via command
# # line arguments and then display them
# num = 12
# name = 'Ayush'
# my_list = [1,2,3]
# print(sys.version_info[0])
# print(sys.version_info[1])
# print('My name is {} and number is {}'.format (name, num))
# print("\n")
# print(np.array(my_list))
# print('\n'+"Output from Python")
# print("\n")
# # print('\n'+"First name: "+ sys.argv[1])
# print("\n")
# # print('\n'+"Last name: "+ sys.argv[2])
# we are importing fetch_movielens method and LightFM class from lightfm
# conda install -c conda-forge lightfm

import sys
import numpy as np
from lightfm.datasets import fetch_movielens
from lightfm import LightFM
line = sys.stdin.readline()
lines = []
lines = line.split(',')
# fetch data and format it
# MovieLens contains 100k movie ratings
# we are restricting our data to movies with min rating 4.0
data = fetch_movielens(min_rating=4.0)

# print training and testing data
#print(repr(data['train']))
#print(repr(data['test']))

# create model
# warp->"weighted approximate rank pairwise",
# USES Gradient descent to reach optimum sol and minimize loss
model =LightFM(loss = 'warp')
# train model
# data['train'] will point to training data
model.fit(data['train'], epochs=30, num_threads=2)

def sample_recommendation(model, data, user_ids):  # user_ids --> ids for which we want recommendation

	#'shape' will provide us number of users and movies
	# from the training data which is stored in dictionary
	n_users, n_items = data['train'].shape

	#generate recommmendations for each user we input
	for  user_id in user_ids:

		# movies they already like/ movies with  positive ratings
		# lightfm considers movies with ratings = 5.0 as positive and ratings<=4.0 as negative.
		# This makes the problem binary and easy.
		# tocsr()-> compressed sparse row format
		known_positives = data['item_labels'][data['train'].tocsr()[user_id].indices]

		# movies our model predicts they will like
		# arange(n_items)-> to include all the movies
		scores = model.predict(user_id, np.arange(n_items))

		# rank them in order of most liked to least
		# '-' negative sign is used since we want descending order
		top_items = data['item_labels'][np.argsort(-scores)]

		# print out the results, %s converts user_id to string
		print("User %s" % user_id+":")
		print("		known positives:")

		for x in known_positives[:3]:
			print("			  %s" % x)

		print("		recommmended:")

		for x in top_items[:3]:
			print("			  %s" % x)

sample_recommendation(model, data, [lines[0],lines[1],lines[2]])
#sample_recommendation(model, data, [3,23,450])
