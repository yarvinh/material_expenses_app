class ItemsController < ApplicationController

        def show
            item = Item.find(params[:id])
            render json:ItemSerializer.new(item).to_serialized_json
        end
    
        def create
            receipt = Receipt.find(params[:receipt_id])
            location = receipt.location
            user = location.user
            item = Item.new(item_name: params[:item_name],price: params[:price])
            item.receipt = receipt
            item.user = user
            item.save
            render json:ItemSerializer.new(item).to_serialized_json
        end
    
        def destroy
            item = Item.find(params[:id])
            item.delete
           end
      
end
