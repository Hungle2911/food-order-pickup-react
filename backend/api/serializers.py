from rest_framework import serializers
from .models import MenuItem, Cart, Order, OrderDetail

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'cost', 'category', 'description', 'ingredients', 'photo_url', 'rating']

class CartSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(), source='menu_item', write_only=True
    )

    class Meta:
        model = Cart
        fields = ['id', 'menu_item', 'menu_item_id', 'quantity']

class OrderDetailSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(), source='menu_item', write_only=True
    )

    class Meta:
        model = OrderDetail
        fields = ['id', 'menu_item', 'menu_item_id', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'order_code', 'total_cost', 'instructions', 'client_name',
                  'phone_number', 'status', 'date_time', 'order_details']
        read_only_fields = ['order_code', 'date_time']

class OrderCreateSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True)

    class Meta:
        model = Order
        fields = ['instructions', 'client_name', 'phone_number', 'order_details']

    def create(self, validated_data):
        order_details_data = validated_data.pop('order_details')
        order = Order.objects.create(**validated_data)

        total_cost = 0
        for order_detail_data in order_details_data:
            OrderDetail.objects.create(order=order, **order_detail_data)
            total_cost += order_detail_data['menu_item'].cost * order_detail_data['quantity']

        order.total_cost = total_cost
        order.order_code = f"ORD-{order.id:06d}"
        order.save()

        return order
