"""jda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from jda_rest_api import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.main_page),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^list/$', views.SubmissionDetailList.as_view()),
    url(r'^languages/$', views.LanguageDetails.as_view()),
    url(r'^submission_detail/(?P<pk>[0-9]+)/$', views.SubmissionDetails.as_view()),
    url(r'^stats/$', views.get_stats),
    url(r'^langs/$', views.get_languages),
]
