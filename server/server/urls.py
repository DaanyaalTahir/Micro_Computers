from django.contrib import admin
from django.urls import path, include
from mc_site.urls import router
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('mc_site.urls')),
    path('api/', include(router.urls))

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)