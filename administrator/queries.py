from cassandra.cluster import Cluster
from cassandra.cqlengine.management import sync_table


class Construct(object):
	c_data=[]
	def __init__(self,temp):
		self.c_data=[]
		for obj in temp:
			self.c_data.append(obj)

class query:
	cluster=None
	session=None
	def __init__(self):
		self.cluster=Cluster()
		self.session=self.cluster.connect()
		self.session.execute("USE infoscheme")


	def select_all(self):
		d_quer="select scheme_id, scheme_name, dept_name, s_constraints,s_details from schemes"
		schemes = self.session.execute(d_quer)
		return schemes

	def get_departments(self):
		d_query=self.session.execute("select * from departments")
		return d_query

	def get_constraints(self):
		c_query=self.session.execute("select * from constraints")
		return c_query

	def get_scheme_size(self):
		s_query=self.session.execute("select scheme_id from schemes")
		mx=0
		for x in s_query:
			if x[0]>mx:
				mx=x[0]
		return mx
		
	def add_into_schemes(self,s_data,master_data):
		c_list=[]
		self.cluster.register_user_type('infoscheme', 'construct',Construct)
		s_query="insert into schemes (scheme_id,scheme_name,dept_name,start_date,end_date,s_details,s_constraints)values(?,?,?,?,?,?,["
		if 'constraints' in master_data.keys():
			tlen=len(master_data['constraints'])
			i=0
			for c_tuple in master_data['constraints']:
				temp=[]
				i=i+1
				s_query+="{ c_data : ['"
				s_query+=c_tuple['constraint_name']
				s_query+="','"
				s_query+=c_tuple['answer_type']
				s_query+="'"
				temp.append(c_tuple['constraint_name'])
				temp.append(c_tuple['answer_type'])
				temp_list=c_tuple['fields'].split(';')
				for foo in temp_list:
					temp.append(foo)
					s_query+=",'"
					s_query+=foo
					s_query+="'"
				s_query+=']}'
				if i==tlen:
					pass
				else:
					s_query+=','
				print "hello",
				print s_query
		s_query+="]"
		s_query+=")"
		print s_query
		print s_data
		try:
			s_query=self.session.prepare(s_query)
			self.session.execute(s_query,s_data)
		except:
			return 0
		return 1

	# def add_scheme(self, scheme):
	# 	if(scheme.dept_flag):
	# 		add_dept(scheme.dept_name)
	# 		scheme.dept_id=get_deptid(dept_name)

	# def add_dept(self, dept_name):				#Add department in the db if it doesnt exist
	# 	siz=get_size("departments")
	# 	d_quer="insert into departments (dept_id, dept_name) values (?,?)"
	# 	session.execute(d_quer,(siz,dept_name))

	# def is_num(self, num):
	# 	for i in range(len(num)):
	# 		if num[i]>'9' || num[i]<'0':
	# 			return False
	# 	return True

	# def get_size(self, table_name):
	# 	t_quer=[]
	# 	t_quer=session.execute("select * from %s",table_name)
	# 	return len(t_quer)

	# def is_alpha(self, var):
	# 	for i in range(len(var)):
	# 		temp=var[i]
	# 		if var[i]>'a':
	# 			temp=var[i]-'a'
	# 		else if var[i]>'A':
	# 			temp=var[i]-'A'
	# 		if (temp<0 || temp>26):
	# 			return False
	# 	return True