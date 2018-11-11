from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import jwt,json
from django.http import JsonResponse


@csrf_exempt
def login(request):
    print(request.POST['name'])
    print(request.POST['email'])
    encoded = jwt.encode({"email_id": request.POST['email']}, "SECRET", algorithm="HS256")
    return JsonResponse({'session_id': encoded.decode("utf-8") },status=200)

@csrf_exempt
def getEmailId(re,uid):
    uid = uid.encode()
    uid = jwt.decode(uid, "SECRET", algorithms=["HS256"])  
    return JsonResponse(uid, safe=False)
