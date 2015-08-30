from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from django.http import HttpResponse
import json
import time
import datetime

from .queries import query
# Create your views here.

def home(request):
	quer=query()
	depts=quer.get_departments()
	constr=quer.get_constraints()
	context={
		'depts':depts,
		'constr':constr
	}
	return render(request,"home.html",context)

def submit_scheme(request):
	if request.method=='POST':
		quer=query()
		c_list=[]
		scheme=[]
		c_data=[]
		master_data=json.loads(request.POST.get("master_data"))
		sz=quer.get_scheme_size()
		sz=int(sz)
		scheme.append(sz+1)
		scheme.append(master_data['info']['scheme_name'])
		scheme.append(master_data['info']['department'])
		scheme.append(time.mktime(datetime.datetime.strptime(master_data['info']['start_date'], "%d/%m/%Y").timetuple()))
		scheme.append(time.mktime(datetime.datetime.strptime(master_data['info']['end_date'], "%d/%m/%Y").timetuple()))
		scheme.append(master_data['info']['scheme_details'])
		flag=quer.add_into_schemes(scheme,master_data)
		ret={}
		if flag==1:
			ret['message']='Successful'
		else:
			ret['message']='Failed'
		return HttpResponse(json.dumps(ret),content_type="application/json")
	else:
		return HttpResponse(json.dumps({"nothing to see": "this isn't happening"}),content_type="application/json")

def admin_login(request):
		return render(request, "admin-login.html" , {})