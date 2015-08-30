from django.shortcuts import render
from cassandra.cluster import Cluster
from django.shortcuts import render
from django.http import HttpResponse

from administrator.queries import *
import time
import json
import string
# Create your views here.

exclude = ["scheme_id", "scheme_name", "s_constraints"]
map_attr = ["scheme_id", "scheme_name", "type", "s_constraints"]
def home(request):
		q=query()
		request.session["eligible"] = []
		eligible = q.select_all()
		request.session["eligible"] = eligible
		cluster=Cluster()
		session=cluster.connect()
		session.execute("USE infoscheme")
		all_data=session.execute("select scheme_name,dept_name,s_details from schemes")
		context={
			'data':all_data,
		}
		return render(request, "users.html" ,context)




# def home(request):
# 	q=query()
# 	# q.insert()
# 	request.session["eligible"] = []
# 	eligible = q.select_all()
# 	request.session["eligible"] = eligible
# 	return (render(request, "home.html", {}))

def remove_idx(current, list_rem):
	cnt=0
	for i in range(len(list_rem)):
		current.pop(list_rem[i]-cnt)
		cnt=cnt+1
	return current

def filter_age(request):
	#age=40
	# max_fre(request)
	age=int(request.POST.get('age'))
	current=request.session["eligible"]

	remove_id=[]
	for idx, val in enumerate(current):
		tupple = val
		for inidx, inval in enumerate(tupple):
			if inidx==3:
				for inter, value in enumerate(inval):
					cons = value
					for item in cons:
						if item[0]=='Age' or item[0]=='age':
							if int(item[2])>age or int(item[3])<age:
								remove_id.append(idx)
								
								

	current=remove_idx(current, remove_id)
	context={
		'data':current,
	}
	request.session["eligible"]=current
	return HttpResponse(json.dumps(current),content_type="application/json")

	#util func to find
def find(item, flist):
	for i in range(len(flist)):
		if flist[i]==item:
			return 1
	return 0

def max_fre(request):
	current = request.session["eligible"]
	freq = {}
	for idx, val in enumerate(current):
		tupple = val
		# if map_attr[idx] in freq.keys():
		# 	freq[map_attr[idx]] = freq[map_attr[idx]] +1
		# else:
		# 	freq[map_attr[idx]] =1

		for inidx, inval in enumerate(tupple):
			if inidx==3:
				for inter, value in enumerate(inval):
					cons = value
					for item in cons:
						if item[0] in freq.keys():
							freq[item[0]] = freq[item[0]] + 1
						else:
							freq[item[0]]=1
						break

 	ret=0
 	attr="-1"
 	for x in freq.keys():
 		# if x in exclude:
 		# 	continue
 		if freq[x]>ret:
 			ret=freq[x]
 			attr=x
 	return attr
						


def filter_category(request):
	cat=request.POST.get('category')
	# print cat
	current=request.session["eligible"]
	remove_id=[]
	keep_id=[]
	for idx, val in enumerate(current):
		# print idx, val
		tupple = val
		for inidx, inval in enumerate(tupple):
			if inidx==3:
				for inter, value in enumerate(inval):
					cons = value
					for item in cons:
						if item[0].strip()=='category' or item[0].strip()=='Category':
							fl=0
							# print len(item)
							for i in range(len(item)):
								# print i
								if i>1:
									if item[i].strip()==cat:
										if item[i].strip()=='OBC':
											keep_id.append(idx)
	
	for i in range(len(current)):
		if find(i, keep_id)==0:
			# print i
			remove_id.append(i)	

	current=remove_idx(current, remove_id)
	# print current
	context={
		'data':current,
	}
	request.session["eligible"]=current
	return HttpResponse(json.dumps(current),content_type="application/json")

def get_question(request):
	attr=max_fre(request)
	ret = {}
	if attr=="-1":
		ret['flag']=0
		ret['message']="No questions available"
		return HttpResponse(json.dumps(ret),content_type="application/json")

	ret['attr']=attr
	ret['flag']=1
	ret['message']="Please enter "
	return HttpResponse(json.dumps(ret),content_type="application/json")

def q_filterc(response):
	filter_category(response)




