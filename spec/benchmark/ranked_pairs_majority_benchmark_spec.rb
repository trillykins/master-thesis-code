require 'spec_helper'
require 'csv'
require_relative './../../app/services/voting_service.rb'
require_relative './../../app/services/schulze_service.rb'
require_relative './../../app/services/kemeny_service.rb'
require_relative './../../app/services/ranked_pairs_service.rb'
require_relative './../../app/services/majority_service.rb'
require_relative './../../app/services/exclusion_service.rb'
require_relative './../../app/services/generate_preferences_service.rb'


RSpec.describe 'Ranked-pairs-majority benchmark' do
  before :all do
    @ranked_pairs   = RankedPairsService.new
    @voting_service = VotingService.new
    @repetitions    = 100
    @folder         = 'spec/benchmark_results/ranked_pairs_majority'
    Dir.mkdir('spec/benchmark_results') unless File.exist?('spec/benchmark_results')
    Dir.mkdir(@folder) unless File.exist?(@folder)
  end

  describe '#Ranked-pairs-majority 3 rounds' do
    it '5 voters' do
      puts 'Reading scenarios'
      scenarios = Dir['spec/benchmark_files/5_voters/*'].sort_by { |x| x.split('/').last.split('_').first.to_i }.map do |fname|
        JSON.parse(File.read(fname))
      end

      CSV.open("#{@folder}/three_round_5_voters.csv", 'wb', col_sep: '&') do |csv|
        csv << %w[Alternatives Time Output]

        scenarios.each_with_index do |scenario, idx|
          puts "Benchmarking scenario #{idx}"

          times = []
          @repetitions.times do |_|
            start = Time.now
            @voting_service.majority_ranked_pairs(scenario)
            finish = Time.now
            times << finish - start
          end

          csv << [scenario['movies'].length, times.sum / times.length]
        end
      end
    end

    it '25 voters' do
      puts 'Reading scenarios'
      scenarios = Dir['spec/benchmark_files/25_voters/*'].sort_by { |x| x.split('/').last.split('_').first.to_i }.map do |fname|
        JSON.parse(File.read(fname))
      end

      CSV.open("#{@folder}/three_round_25_voters.csv", 'wb', col_sep: '&') do |csv|
        csv << %w[Alternatives Time Output]

        scenarios.each_with_index do |scenario, idx|
          puts "Benchmarking scenario #{idx}"

          times = []
          @repetitions.times do |_|
            start = Time.now
            @voting_service.majority_ranked_pairs(scenario)
            finish = Time.now
            times << finish - start
          end

          csv << [scenario['movies'].length, times.sum / times.length]
        end
      end
    end
  end
end