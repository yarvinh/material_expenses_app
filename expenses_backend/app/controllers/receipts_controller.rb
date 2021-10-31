class ReceiptsController < ApplicationController
    
        
        def show
            receipt = Receipt.find(params[:id])
            render json:ReceiptSerializer.new(receipt).to_serialized_json
        end
    
        def create
            location = Location.find(params[:location_id])
            receipt = Receipt.new(project_name: params[:project_name])
            receipt.location = location
            receipt.save
      
            render json:ReceiptSerializer.new(receipt).to_serialized_json
        end
    
        def destroy
            receipt = Receipt.find(params[:id])
            receipt.items.each{|e| e.delete}
            receipt.delete
        end
    
    
end
