# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart, MenuItem
from .serializers import CartSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "data": serializer.data
        })

    def create(self, request):
        menu_item_id = request.data.get('menu_item_id')
        quantity = request.data.get('quantity')

        try:
            menu_item = MenuItem.objects.get(id=menu_item_id)
            cart_item, created = Cart.objects.get_or_create(menu_item=menu_item)
            if not created:
                cart_item.quantity += quantity
            else:
                cart_item.quantity = quantity
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except MenuItem.DoesNotExist:
            return Response({"error": "Menu item not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['put'])
    def increment(self, request):
        menu_item_id = request.data.get('menu_item_id')
        try:
            cart_item = Cart.objects.get(menu_item_id=menu_item_id)
            cart_item.quantity += 1
            cart_item.save()
            return Response("Quantity increased", status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['put'])
    def decrement(self, request):
        menu_item_id = request.data.get('menu_item_id')
        try:
            cart_item = Cart.objects.get(menu_item_id=menu_item_id)
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
            return Response("Quantity decreased", status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        menu_item_id = request.data.get('menu_item_id')
        try:
            cart_item = Cart.objects.get(menu_item_id=menu_item_id)
            cart_item.delete()
            return Response("Item was deleted", status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
