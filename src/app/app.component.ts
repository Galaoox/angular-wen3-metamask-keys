import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthWeb3Service } from '../services/auth-web3.service';
import TruffleContract from '@truffle/contract';
import * as TasksContractArtifact from '../../build/contracts/TasksContract.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  form: FormGroup;

  loginUser: boolean = false;
  addressUser: string = '';
  addressUserView: boolean = false;
  web3: any;
  contracts : any = {};
  tasksContractDeployed: any;

  constructor(private fb: FormBuilder, private authWeb3Service : AuthWeb3Service,private cdr: ChangeDetectorRef,){
    this.form = this.createForm();
    this.web3 = this.authWeb3Service.web3Instance;
  }



  ngOnInit(): void {
    this.authWeb3Service.loginUser.subscribe((res: boolean) => {
      this.loginUser = res;
      (!this.loginUser) ? this.addressUserView = false : this.addressUserView = true;
      this.cdr.detectChanges();
    });

    this.authWeb3Service.addressUser.subscribe((res: string) => {
      this.addressUser = res;
      this.cdr.detectChanges();
    });
    this.connect();
  }

  connect() {
    this.authWeb3Service.connect();
  }




  createForm(){
    return this.fb.group({
      title: [''],
      description: [''],
      done: [false]
    });
  }

  onSubmit(){
    this.createTask(this.form.value.title, this.form.value.description);
  }

  async loadContract(){
    this.contracts.tasksContract = TruffleContract(TasksContractArtifact);
    this.contracts.tasksContract.setProvider(this.authWeb3Service.web3Instance);
    this.tasksContractDeployed = await this.contracts.taskContract.deployed();
  }

  async createTask(title: string, description: string){
    const result = this.tasksContractDeployed.createTask(title, description, {from: this.addressUser});
  }








}
