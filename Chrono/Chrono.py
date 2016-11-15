import csv

def filter(link):

	#Création des fichiers qui contiendront les mots de chaques participants
	#fout4 = open("data/sortie_filter_4.txt","w")	

	content = []
	content1 = []
	content2 = []
	content3 = []
	tabOrateur =[]

	i=0

	#Ecriture du contenu du fichier dans une liste
	with open(link,"r") as f:
		for line in f:
			for word in line.split():
				content.append(word)
				i+=1
	

	for idx,item in enumerate(content):

		#Gestion du 1er Cas
		if item=="CLINTON:":
			
			#Calcul de l'indice du prochain qui va parler
			j=idx+1
			while content[j]!="TRUMP:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
			
			k=idx+1
			while content[k]!="HOLT:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res4=k-idx

			k=idx+1
			while content[k]!="WALLACE:":
				if k==len(content)-1:
					break
				k+=1
			res5=k-idx



			#Test de celui qui parlera en prochain
			res=min(res1,res2,res3,res4,res5)

			for i in range(idx+1,res+idx):
				#content1.append(content[i])
				tabOrateur.append("CLINTON")

		#Gestion du 2eme cas
		if item=="TRUMP:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
			
			k=idx+1
			while content[k]!="HOLT:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res4=k-idx

			k=idx+1
			while content[k]!="WALLACE:":
				if k==len(content)-1:
					break
				k+=1
			res5=k-idx

			res=min(res1,res2,res3,res4,res5)

			for i in range(idx+1,res+idx):
				#content2.append(content[i])
				tabOrateur.append("TRUMP")


		#Gestion du 3ème cas
		if item=="HOLT:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				#content3.append(content[i])
				tabOrateur.append("MODERATOR")

		if item=="RADDATZ:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				#content3.append(content[i])
				tabOrateur.append("MODERATOR")

		if item=="COOPER:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				#content3.append(content[i])
				tabOrateur.append("MODERATOR")

		if item=="WALLACE:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				#content3.append(content[i])
				tabOrateur.append("MODERATOR")

	#fout4.write(str())


	#results = []
	##results.append(content1)
	#results.append(content2)
	#results.append(content3)

	print("Worked Fine")

	return tabOrateur

#def filter2(link):
	#Création des fichiers qui contiendront les mots de chaques participants
	fout4 = open("data/sortie_filter_4.txt","w")	

	content = []
	text = []

	i=0

	#Ecriture du contenu du fichier dans une liste
	with open(link,"r") as f:
		for line in f:
			for word in line.split():
				content.append(word)
				i+=1
	

	for idx,item in enumerate(content):

		#Gestion du 1er Cas
		if item=="CLINTON:":
			
			#Calcul de l'indice du prochain qui va parler
			j=idx+1
			while content[j]!="TRUMP:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
			
			k=idx+1
			while content[k]!="HOLT:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res4=k-idx

			k=idx+1
			while content[k]!="WALLACE:":
				if k==len(content)-1:
					break
				k+=1
			res5=k-idx



			#Test de celui qui parlera en prochain
			res=min(res1,res2,res3,res4,res5)

			for i in range(idx+1,res+idx):
				text.append(content[i])
				#tabOrateur.append("CLINTON")

		#Gestion du 2eme cas
		if item=="TRUMP:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
			
			k=idx+1
			while content[k]!="HOLT:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res4=k-idx

			k=idx+1
			while content[k]!="WALLACE:":
				if k==len(content)-1:
					break
				k+=1
			res5=k-idx

			res=min(res1,res2,res3,res4,res5)

			for i in range(idx+1,res+idx):
				text.append(content[i])
				#tabOrateur.append("TRUMP")

		#Gestion du 3ème cas
		if item=="HOLT:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				text.append(content[i])
				#tabOrateur.append("MODERATOR")

		if item=="RADDATZ:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				text.append(content[i])
				#tabOrateur.append("MODERATOR")

		if item=="COOPER:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				text.append(content[i])
				#tabOrateur.append("MODERATOR")

		if item=="WALLACE:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				text.append(content[i])
				#tabOrateur.append("MODERATOR")




	fout4.write(str(text))

	print("Worked Fine")

	return text

def test(linkIn, linkOut):

	tabOrateur = filter(linkIn)
	text = filter2(linkIn)

	tabIndice = []
	tabLongueur = []
	tabText = []

	fout = open(linkOut,"w")
	c = csv.writer(fout)

	#On définit les paramètres du CSV
	c.writerow(["longueur", "orateur", "X", "text"])

	#On ajoute 0 pour le premier Moderateur qui parle
	tabIndice.append(0)

	for i in range (0,len(tabOrateur)-2): 
		if tabOrateur[i]!=tabOrateur[i+1]:
			tabIndice.append(i+1)

	for i in range (0,len(tabIndice)-1):
		tabLongueur.append(tabIndice[i+1]-tabIndice[i])


	for i in range(0, len(tabIndice)-1):
		
		temp = ""
		for j in range(tabIndice[i],tabIndice[i+1]-1):
			temp+=text[j]+" "
		tabText.append(temp)

	for i in range(0,len(tabIndice)-1):
		c.writerow([tabLongueur[i], tabOrateur[tabIndice[i]], tabIndice[i], 
			tabText[i]])

#def test2(linkIn, linkOut):

	tabOrateur = filter(linkIn)
	tabIndice = []
	tabLongueur = []

	fout = open(linkOut,"w")
	c = csv.writer(fout)

	#On définit les paramètres du CSV
	c.writerow(["longueur", "orateur", "X"])

	#On ajoute 0 pour le premier Moderateur qui parle
	tabIndice.append(0)

	for i in range (0,len(tabOrateur)-2): 
		if tabOrateur[i]!=tabOrateur[i+1]:
			tabIndice.append(i+1)

	for i in range (0,len(tabIndice)-1):
		tabLongueur.append(tabIndice[i+1]-tabIndice[i])

	for i in range(0,len(tabIndice)-1):
		c.writerow([tabLongueur[i], tabOrateur[tabIndice[i]], tabIndice[i]])

#def test3(linkIn, linkOut):

	tabOrateur = filter(linkIn)
	tabIndice = []
	tabLongueur = []

	fout = open(linkOut,"w")
	c = csv.writer(fout)

	#On définit les paramètres du CSV
	c.writerow(["longueur", "orateur", "X"])

	#On ajoute 0 pour le premier Moderateur qui parle
	tabIndice.append(0)

	for i in range (0,len(tabOrateur)-2): 
		if tabOrateur[i]!=tabOrateur[i+1]:
			tabIndice.append(i+1)

	for i in range (0,len(tabIndice)-1):
		tabLongueur.append(tabIndice[i+1]-tabIndice[i])

	for i in range(0,len(tabIndice)-1):
		c.writerow([tabLongueur[i], tabOrateur[tabIndice[i]], tabIndice[i]])
	
test("data/textToAnalyze.txt", "data/chrono.csv")
test("data/textToAnalyze2.txt", "data/chrono2.csv")
test("data/textToAnalyze3.txt", "data/chrono3.csv")

