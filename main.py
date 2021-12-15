from os import linesep
from flask import Flask, session, sessions
from flask import render_template, request, redirect
from json import *
from threading import *
from datetime import datetime
import random
import string
import hashlib

import flask

app = Flask(__name__,static_folder='./templates')
app.secret_key = 'any random string'

@app.route('/')
def index():
    return render_template('index.html',reduc=0,lien='_',a=False)
@app.route('/affiliation/<lien>')
def affilier(lien):
    return render_template('index.html',reduc=25,lien=lien,a=True)
@app.route('/commande/<lien>/<obj>')
def commande(lien,obj):
    session['lien'] = lien
    session['obj'] = obj
    session['p'] = random_string()
    session['g'] = random_string()
    print(session)
    ach = hash((session['p'],session['lien'],hash((session['obj'],session['g']))))
    return f'<script>window.location="http://127.0.0.1/achat/{ach}"</script>'
@app.route('/achat/<ach>')
def achat(ach):
    if int(ach) == hash((session['p'],session['lien'],hash((session['obj'],session['g'])))):
        return render_template('achat/achat.html',lien=session['lien'],obj=session['obj'],ach=ach)
    else :
        print(hash((session['p'],session['lien'],hash((session['obj'],session['g'])))),ach)
        print(session['p'],session['lien'],session['obj'],session['g'])
        return '<h1>il y a un problème</h1>'                                                                                        #---------- erreur a faire
@app.route('/achat/<ach>/valide/<ach2>')
def valider(ach,ach2):
    ach22 = hashlib.sha256()
    ach22m = session['lien'] + session['obj'] + ach
    ach22.update(ach22m.encode('utf-8'))
    if int(ach) == hash((session['p'],session['lien'],hash((session['obj'],session['g'])))):
        if ach2 == ach22.hexdigest():
            bd1 = open("bdd.txt","r").read()
            bd2 = open("bdd.txt","w")
            bd2.write(datetime.fromtimestamp(datetime.now().timestamp()).strftime("%d-%b-%Y (%H:%M:%S)")+'  lien = '+session['lien']+ "    obj = "+session['obj']+'\n\r'+ bd1)
            bd2.close()
            session['lien'] = session['obj'] =session['p'] =session['g'] = ''
            return render_template('achat/merci.html',lien=session['lien'],obj=session['obj'])
        else:
            print('ach2= ',ach2,' ach22= ',ach22.hexdigest())
            return '<h1>il y a un problème</h1>'                                                                                    #---------- erreur a faire
    else:
        print('ach = ',ach,' hash = ',hash((session['p'],session['lien'],hash((session['obj'],session['g'])))))
        return '<h1>il y a un problème</h1>'                                                                                               #---------- erreur a faire

def random_string(size=35, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for nomdevarriablequejenerisquepasdereprendre in range(size))


@app.route('/mrc/')
def mrc():
    text = f"votreㅤ{'cadybite'}ㅤarriveraㅤdansㅤlesㅤplusㅤbrefㅤdélaitㅤetㅤjeㅤvousㅤinformeraitㅤpersonnellementㅤdeㅤl'avencementㅤdeㅤvotreㅤcolis."
    text = list(text.strip())
    return render_template('achat/merci.html',lien='maxence',obj='cadybite',text=text)



app.run(host='127.0.0.1', port=80)
 