# Create your views here.
from django.shortcuts import render
from jda_rest_api.models import Submissions,Language
from jda_rest_api.serializers import SubmissionsSerializer,LanguageSerializer
from django.db.models import Count
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext,Template
from rest_framework import generics
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class SubmissionDetailList(generics.ListCreateAPIView):
    queryset = Submissions.objects.all()
    serializer_class = SubmissionsSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title','metadata','language')
    pagination_class = StandardResultsSetPagination

class LanguageDetails(generics.ListCreateAPIView):
	queryset = Language.objects.all()
        serializer_class = LanguageSerializer

class SubmissionDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Submissions.objects.all()
    serializer_class = SubmissionsSerializer

def main_page(request):
      resp = render_to_response("index.html")
      return resp

def comparator(item1,item2):
	metadata1 = json.loads(item1[0])
	metadata2 = json.loads(item2[0])
	if metadata1['users_attempted'] > metadata2['users_attempted']:
		return 1
	else:
		return -1
@api_view(['GET'])
def get_languages(request):
	langs = Language.objects.all()
	lang_images = {}
	for lan in langs:
		lang_images[lan.language] = lan.icon;
	return Response(lang_images)


@api_view(['GET'])
def get_stats(request):

	total_count = Submissions.objects.all().count()
	medium_count = Submissions.objects.filter(metadata__icontains="medium").count()
	hard_count = Submissions.objects.filter(metadata__icontains="hard").count()
	easy_count = Submissions.objects.filter(metadata__icontains="easy").count()
	subs = Submissions.objects.values('language').annotate(num_submissions=Count('language')).order_by('-num_submissions')[:5]
	users_attempted = Submissions.objects.values('title').annotate(num_attemtpted=Count('title')).order_by('-num_attemtpted')[:2]
	attempt = {}
	for user in users_attempted:
		attempt[user['title']] = user['num_attemtpted']
	response = {"submissions_per_level": {"Medium" : medium_count,"Hard":hard_count,"Easy":easy_count}}
	response['top-5-languages-used']=subs
	response['total_submissions']= total_count
	#response['top-2-submissions']= {users_attempted[0][1]:users_attempted[0][0]['users_attempted'],users_attempted[1][1]:users_attempted[1][0]['users_attempted']}
	response['top-2-submissions']= attempt
	return Response(response)
