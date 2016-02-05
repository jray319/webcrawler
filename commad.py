import os
import sys

url_list = sys.argv[1]
command = sys.argv[2:]

with open(url_list, 'r') as fin:
	for l in fin:
		tokens = l.rstrip('\n').split(',')
		id = tokens[0]
		url = 'http://' + tokens[1]
		print ' '.join(command + [url, 'logs/' + id + '.out'])